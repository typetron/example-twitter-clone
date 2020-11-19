export const users = ['John', 'Joe', 'Doe', 'Kevin', 'Mike']

export function toFormData(data: object): FormData {
    const form = new FormData()
    buildFormData(form, data)
    return form
}

export function buildFormData(formData: FormData, data: object | undefined | null, parentKey?: string): void {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key], parentKey ? `${parentKey}[]` : key)
        })
    } else {
        if (data !== undefined && data !== null) {
            formData.append(parentKey, data as Blob)
        }
        // const value = data !== null ? '' : data
        //
        // formData.append(parentKey, value as string)
    }
}
