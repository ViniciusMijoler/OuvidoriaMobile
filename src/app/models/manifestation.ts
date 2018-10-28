import { Photo } from '../models/photo';
import { Classification } from './classification';
import { Segment } from './segment';
import { Place } from './place';
import { Subject } from './subject';
import { SubSubject } from './sub-subject';
import { Demanda } from './demanda';
import { Situation } from './situation';


export interface Manifestation {
    year: number;
    sequence: number;
    dateIncluded: string;
    userId: number;
    classification: Classification;
    segment: Segment;
    place: Place;
    subject: Subject;
    subSubject: SubSubject;
    photos: Photo[];
    situation: Situation;
    manifestationText: string;
    answerLetter: string;
    demand: Demanda;
    registration: number; // matricula
    manifestationTypeId?: number; // codTipoManifestacao
    priorityId?: number; // codPrioridade
}
