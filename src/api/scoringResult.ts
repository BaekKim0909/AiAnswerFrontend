import type {
  ScoringResultAddRequest,
  ScoringResultEditRequest,
  ScoringResultQueryRequest
} from '@/Model/ScoringResult'
import request from '@/utils/request'

export const addScoringResultService = (scoringResult: ScoringResultAddRequest) => {
  return request.post('/api/scoring_result/add', { ...scoringResult })
}
export const editScoringResultService = (scoringResult: ScoringResultEditRequest) => {
  return request.post('/api/scoring_result/edit', { ...scoringResult })
}
export const listScoringResultVoByPageService = (query: ScoringResultQueryRequest) => {
  return request.post('/api/scoring_result/list/page/vo', { ...query })
}
export const deleteScoringResultService = (id: string) => {
  return request.delete(`api/scoring_result/delete/${id}`)
}
