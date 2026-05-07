import { inject, injectable } from 'inversify';
import { IAssessmentRepository } from '../../../../application/contracts';

@injectable()
export class DeleteAssessmentUseCase {
  public constructor(
    @inject(IAssessmentRepository) private assessmentRepository: IAssessmentRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.assessmentRepository.delete(id);
  }
}
