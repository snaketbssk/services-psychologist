// hooks/useService.ts
import { ServiceType } from '@/core/types/service-type'
import { container } from '../configs/inversify.config'

let isFirst = true

export function useService<K extends keyof ServiceType>(key: K): ServiceType[K] {
  if (isFirst) {
    console.log(789)
  } else {
    console.log(123)
    isFirst = false
  }

  return container.get<ServiceType[K]>(key)
}
