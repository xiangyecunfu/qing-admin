// 环境判断
const ENV = import.meta.env.VITE_ENV as string
// 生成环境所用的接口
const URL = import.meta.env.VITE_BASE_URL as string
// 上传地址
export const FILE_API = `${ENV === 'development' ? '/api' : URL}/authority/file/upload-file`
