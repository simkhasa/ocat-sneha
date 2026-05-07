import { injectable } from 'inversify';
import { Request } from 'express';
import { BaseController } from '../../../../infrastructure/http/BaseController';
import { DeleteAssessmentUseCase } from './useCase';

@injectable()
export class DeleteAssessmentController extends BaseController {
  public constructor(
    private deleteAssessmentUseCase: DeleteAssessmentUseCase,
  ) {
    super();
  }

  protected async executeImpl(req: Request): Promise<any> {
    const id = parseInt(req.params.id);
    await this.deleteAssessmentUseCase.execute(id);
    return { message: `Assessment deleted successfully` };
  }
}
