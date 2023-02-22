

import instance from './axios'

export const lineNotify = async (message: any) => {
    try {

        const res = await instance.post('/', { message })
        console.log("=============== call line success =================")
        console.log(res.data)
        console.log(res.status)
    } catch (error) {
        console.log("=================================================", error)
    }
}



