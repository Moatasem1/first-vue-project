/* eslint-disable @typescript-eslint/no-explicit-any */

export type ValidatorFn = (value: any) => string | null

export class ValidationService{

   static required: ValidatorFn= (value) =>
      value ? null : 'This field is required.'

   static email: ValidatorFn = (value) => {
      if (!value) return null
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(value) ? null : 'Invalid email address.'
    }

   static minLength = (min: number): ValidatorFn => (value) =>
      value && value.length >= min ? null : `Minimum length is ${min}.`

   static maxLength = (max: number): ValidatorFn => (value) =>
      value && value.length <= max ? null : `Maximum length is ${max}.`

   static validateField(value: any, validators: ValidatorFn[]){
      for(const validator of validators){
        const error = validator(value)
        if(error) return error
      }
      return ''
    }
}
