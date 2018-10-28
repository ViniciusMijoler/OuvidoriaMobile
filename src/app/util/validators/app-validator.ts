import { ValidatorFn, AbstractControl } from '@angular/forms';

export class AppValidator {

    public static matchWith(toControlName: string): ValidatorFn {
        let ctrl: AbstractControl;
        let toCtrl: AbstractControl;
        return function matchWith(control: AbstractControl): {[key: string]: any} {

          if (!control.parent) {
            return null;
          }

          if (!ctrl) {
            ctrl = control;
            toCtrl = control.parent.get(toControlName) as AbstractControl;

            if (!toCtrl) {
              return null;
            }

            toCtrl.valueChanges.subscribe(() => {
              ctrl.updateValueAndValidity();
            });
          }

          if (ctrl.value !== '' && toCtrl.value !== ctrl.value) {
            return { matchWith: true };
          }
          return null;
        };
      }

}
