export interface UseCase<S,T>{
  excute(input:S):T
}
