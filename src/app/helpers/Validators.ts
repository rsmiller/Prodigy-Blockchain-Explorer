import { AbstractControl, ValidatorFn } from "@angular/forms";

export function UUIDValidator(): ValidatorFn {
    return (control: AbstractControl) : {[key: string]: any} | null => {
        let inputControlValue = control.value;

        if(inputControlValue == "" || control == null)
        {
          return null;
        }

        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        let test = regexExp.test(inputControlValue);
        if(test != true)
        {
            return { 'isUUID': true};
        }

        return null;
        
    }
}