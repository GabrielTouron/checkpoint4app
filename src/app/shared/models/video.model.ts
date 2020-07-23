import { Battle } from './battle.model';
import { Step } from './step.model';
import { Place } from './place.model';

export class Video {
  id?: number;
  videoTitle: string;
  commentary: string;
  juryCommentary: string;
  ytLink: string;
  isWinner: boolean;
  battle: Battle;
  step: Step;
  place: Place;

}
