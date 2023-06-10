// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http

function uploadByFtp(file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}

function uploadBySftp(file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}

function uploadByHttp(file: string): boolean {
    return true
}

function useFtp(file: string): Promise<boolean> {
    return uploadByFtp(file)
}

function useSftp(file: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        uploadBySftp([file], ret => {
            if (ret) {
                resolve(true)
            } else {
                reject(false)
            }
        })
    })
}

function useHttp(file: string): Promise<boolean> {
    return Promise.resolve(uploadByHttp(file))
}


const fileUpload = (fileInfo: UploadParams): Promise<boolean> => {
    return fileInfo.executionCallback(fileInfo.file);
}

// 实现如下
function _upload(files: UploadParams[]): Promise<boolean> {
    return Promise.allSettled(files.map(item => {
            return fileUpload(item)
        })
    ).then((results) => {
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.log(`upload ${files[index].file} failed.`)
            } else {
                console.log(`upload ${files[index].file} success.`)
            }
        })
        return true
    })
}


const uploadTypeMap: Record<string, (file: string) => Promise<boolean>> = {
    txt: useFtp,
    exe: useSftp,
    doc: useHttp
}

function getFileType(file: string): string {
    return file.split('.').pop() || '';
}

function filterFilesByType(files: string[]): string[] {
    return files.filter(file => {
        const type = getFileType(file);
        if (!type || !uploadTypeMap[type]) {
            console.error(`file:${file} type is not supported`)
        }
        return !!type && uploadTypeMap[type];
    })
}

function upload(files: string[]) {
    return _upload(filterFilesByType(files).map(file => {
        const type = getFileType(file);
        return {
            file,
            executionCallback: uploadTypeMap[type]
        }
    }));
}

interface UploadParams {
    file: string,
    executionCallback: (files: string) => Promise<boolean>
}

