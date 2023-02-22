

import dayjs from 'dayjs'
import prisma from '../../prisma'
import { IPayload } from './types'

export const editorReserve = async (payload: IPayload) => {
    try {
        console.log("payload ", payload)

        const date = dayjs(payload.checking_date).format('YYYY-MM-DD HH:mm:ss')
        console.log("checking_date ", date)

        let checking = await prisma.$queryRaw`UPDATE tbl_books SET 
        editor_checking_by = ${payload.userId},
        editor_checking_date=  ${date}
        WHERE b_id = ${payload.b_id} AND editor_checking_by IS NULL
        `
        console.log("editor reserve updated ", checking)
        return checking
    }
    catch (e) {
        console.log('editor reserve error', e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const editorCancelReserve = async (payload: IPayload) => {
    try {
        let book = await prisma.tbl_books.update({
            where: { b_id: payload.b_id },
            data: {
                editor_checking_by: null,
                editor_checking_date: null
            }
        })
        console.log('editor cancel reserve success', book)
        return book
    }
    catch (e) {
        console.log('editor cancel reserve error', e)

        await prisma.$disconnect()
        process.exit(1)
    }
}

export const adminReserve = async (payload: IPayload) => {
    try {
        console.log("payload ", payload)

        const date = dayjs(payload.checking_date).format('YYYY-MM-DD HH:mm:ss')
        let checking = await prisma.$queryRaw`UPDATE tbl_books SET 
        admin_checking_by = ${payload.userId},
        admin_checking_date = ${date}
        WHERE b_id = ${payload.b_id} AND admin_checking_by IS NULL
        `
        console.log("admin reserve updated ", checking)
        return checking
    }
    catch (e) {
        console.log('admin reserve error', e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

export const adminCancelReserve = async (payload: IPayload) => {
    try {
        let book = await prisma.tbl_books.update({
            where: { b_id: payload.b_id },
            data: {
                admin_checking_by: null,
                admin_checking_date: null
            }
        })
        console.log('admin cancel reserve success', book)
        return book
    }
    catch (e) {
        console.log('admin cancel reserve error', e)
        await prisma.$disconnect()
        process.exit(1)
    }
}

