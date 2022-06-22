import { useSearchParams } from 'react-router-dom'

export const useGetQueryParameter = (searchedParam?: string) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryParameter = searchParams.get(searchedParam || '')

  const onChangeQueryParameter = (parameter: string) => {
    if (searchedParam) setSearchParams({ [searchedParam]: parameter })
  }

  return {
    queryParameter,
    onChangeQueryParameter
  }
}
