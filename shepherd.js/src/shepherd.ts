import { Shepherd, Tour } from './tour';
import { StepNoOp, TourNoOp } from './utils/general';
import { Step } from './step';

const isServerSide = typeof window === 'undefined';

Shepherd.Step = (isServerSide ? StepNoOp : Step) as unknown as typeof Step;
Shepherd.Tour = (isServerSide ? TourNoOp : Tour) as unknown as typeof Tour;

export default Shepherd;
