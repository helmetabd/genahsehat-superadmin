import { H3Event } from 'h3'
export const serverApi = (event: H3Event) => {
    const {apiUrl} = useRuntimeConfig().public.backendUrl
    const token = getCookie(event, 'token')
    const client = new 
}