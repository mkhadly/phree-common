//@ts-ignore

import * as Sharp from 'sharp'
import * as AWS from 'aws-sdk'

export class AWSS3 {
    s3:any
    
    config = {
        accessKeyId: (process.env.AWS_ACCESS_KEY_ID as any).replace(/\n$/, ''),
        secretAccessKey: (process.env.AWS_SECRET_ACCESS_KEY as any).replace(/\n$/, ''),
        region: process.env.AWS_REGION,
    }

    
    constructor() {
        this.s3 = new AWS.S3(this.config)
    }

    /**
     * Upload image to S3
     * - Doing resize to produce all provided sizes -> for sizes=[200,300] -> images will be [200x200_name,300x300_name]
     * - If provoid a non-squared image it will be padded with white background
     * - Push the resized images to the bucket
     * Return Promise[]
     * 
     * @param img base64 encoded image
     * @param name the unique identity key for the image
     * @param bucket bucket name
     * @param sizes array of sizes [can't be empty]
     */
    uploadImage(img: string, name: string, bucket: string, sizes: number[]) {
        return new Promise((resolve, reject) => {

            (async () => {
                try {
                    if (sizes.length == 0)
                        reject("Sizes cannot be  empty")

                    const resizingPromises = sizes.map(size => Sharp(Buffer.from(img, 'base64')).resize(size, size, { fit: 'contain' }).toBuffer())
                    const imageBuffers = await Promise.all(resizingPromises)

                    const uploadPromises = imageBuffers.map((buffer, index) => this.s3.upload({
                        Body: buffer,
                        Key: name + "_" + sizes[index].toString() + "x" + sizes[index].toString(),
                        Bucket: bucket,
                        ACL: 'public-read',
                    }).promise())

                    const awsFeedback = await Promise.all(uploadPromises)
                    resolve(awsFeedback.map(img => img.Location))


                } catch (e) {
                    console.log(e)
                    reject(e)
                }
            })()


        })

    }

}