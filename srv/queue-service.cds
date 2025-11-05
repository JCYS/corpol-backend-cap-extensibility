using {queue as model} from '../db/queue-schema';


service QueueService {

    entity Queue as projection on model.Queue;

}
