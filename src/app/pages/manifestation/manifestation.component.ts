import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models
import { Manifestation } from '../../models/manifestation';
import { Priority } from '../../models/priority';
import { Situation } from '../../models/situation';

// Services
import { ManifestationService } from '../../services/manifestation.service';
import { PriorityService } from '../../services/priority.service';
import { SituationService } from '../../services/situation.service';

// Validators
import { MyErrorStateMatcher } from '../../util';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manifestation',
  templateUrl: './manifestation.component.html',
  styleUrls: ['./manifestation.component.scss']
})
export class ManifestationComponent implements OnInit, OnDestroy {

  public priorities: Priority[] = [];
  public situations: Situation[] = [];

  public manifestationForm: FormGroup;
  public paramsSubscribe: Subscription;
  public showAnswer = false;

  @ViewChild('answer') answer: ElementRef;

  matcher = new MyErrorStateMatcher();

  public imageSources: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private manifestationService: ManifestationService,
    private priorityService: PriorityService,
    private situationService: SituationService,
    public snackBar: MatSnackBar
  ) {
    this.imageSources = ['./assets/images/splash.png'];

    this.priorityService.getPriorities()
      .then((res: Priority[]) => {
        this.priorities = res;
      })
      .catch((err) => {
        console.error(err);
      });

    this.situationService.getSituations()
      .then((res: Situation[]) => {
        this.situations = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  ngOnInit() {
    this.manifestationForm = this._formBuilder.group({
      year: [null, Validators.required],
      sequence: [null, Validators.required],
      protocol: [null, Validators.required],
      dateIncluded: [null, Validators.required],
      userId: [null, Validators.required],
      classification: this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      segment: this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      place: this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      subject: this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      subSubject: this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      photos: [[]],
      situation:  this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      manifestationText: [''],
      answerLetter: ['', Validators.required],
      demand: this._formBuilder.group({
        id: this._formBuilder.control(0),
        description: this._formBuilder.control('')
      }),
      registration: [0, Validators.required],
      manifestationTypeId: [0],
      priorityId: [0, Validators.required]
    });

    this.paramsSubscribe = this.route.queryParams.subscribe(
      (queryParams: any) => {
        let year: number = queryParams['year'];
        let sequence: number = queryParams['sequence'];

        this.manifestationService.getManifestation(year, sequence)
          .then((res: Manifestation) => {
            console.log(res);
            res['protocol'] = res.year.toString() + res.sequence.toString();
            res.dateIncluded = res.dateIncluded.substring(0, 10);
            this.manifestationForm.setValue(res);
            this.imageSources = res.photos.map(p => p.photo);
          })
          .catch((err) => {
            console.error(err);
            this.imageSources = ['./assets/images/splash.png'];
          });
      }
    );

  }

  ngOnDestroy() {
    this.paramsSubscribe.unsubscribe();
  }

  reply() {
    this.showAnswer = true;
  }

  cancel() {
    this.showAnswer = false;
  }

  sendAnswer() {
    if (!this.manifestationForm.valid
        || !this.manifestationForm.value.priorityId
        || this.manifestationForm.value.priorityId === 0
        || !this.manifestationForm.value.situation.id
        || this.manifestationForm.value.situation.id === 0) {
      for (let key of Object.keys(this.manifestationForm.controls)){
        this.manifestationForm.controls[key].markAsDirty();
      }
      this.snackBar.open('Por favor verifique os campos');
      return;
    }

    this.manifestationService.sendAnswer(this.manifestationForm.value)
      .then((res) => {
        this.snackBar.open('Enviado com sucesso.');
        this.showAnswer = false;
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }

}
