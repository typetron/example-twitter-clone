import type { AbstractControl, ValidatorFn } from '@angular/forms'
import { FormControl, FormGroup } from '@angular/forms'
import type { Form, FormField } from '@Typetron/Forms'
import { Constructor } from '@Typetron/Support'

export function toFormData(data: object): FormData {
    const form = new FormData()
    buildFormData(form, data)
    return form
}

export function buildFormData(formData: FormData, data: object | undefined | null, parentKey?: string): void {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
        Object.keys(data).forEach(key => {
            buildFormData(formData, data[key as keyof object], parentKey ? `${parentKey}` : key)
        })
    } else {
        if (data !== undefined && data !== null) {
            formData.append(parentKey as string, data as Blob)
        }
        // const value = data !== null ? '' : data
        //
        // formData.append(parentKey, value as string)
    }
}

export function isValid(form: FormGroup): boolean {
    Object.values(form.controls).forEach(control => {
        control.markAsDirty()
        control.updateValueAndValidity()
    })

    return form.valid
}

export class FormBuilder {
    static build<T extends Form>(form: typeof Form & Constructor<T>): FormGroup {
        const controls: Record<string, AbstractControl> = {}
        const formFields = Object.values(form.fields()) as FormField[]
        const instance = new (form as unknown as Constructor<T>)()
        Object.values(formFields).forEach(field => {
            controls[field.name] = new FormControl(
                instance[field.name as keyof Form],
                {validators: this.getValidators(field)}
            )
        })
        return new FormGroup(controls)
    }

    private static getValidators(field: FormField): ValidatorFn {
        return control => field.validate(control.value) as unknown as ValidatorFn
    }
}
