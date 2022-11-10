import { Injectable } from "@angular/core";
import { AbstractControl, Validators, FormGroup } from "@angular/forms";

export function isDateGreaterThanToday(date: string) {
    return(formGroup: FormGroup): Validators => {
        const control = formGroup.controls[date]

        var data = control.value.split('/').reverse().join('/');
        const today = new Date().toLocaleDateString().split('/').reverse().join('/');
        
        if(data < today){
            control.setErrors({dataNotValid: true});
        }
        return true;
    }
}

export function isDateMinorThanToday(date: string) {
    return(formGroup: FormGroup): Validators => {
        const control = formGroup.controls[date]

        var data = control.value.split('/').reverse().join('/');
        const today = new Date().toLocaleDateString().split('/').reverse().join('/');

        if(data > today){
            control.setErrors({dataNotValid: true});
        }
        return true;
    }
}