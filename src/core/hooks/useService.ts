// hooks/useService.ts
import { ServiceType } from '@/core/types/service-type'
import { container } from '../configs/inversify.config'

export function useService<K extends keyof ServiceType>(key: K): ServiceType[K] {
  return container.get<ServiceType[K]>(key)
}
