export type AccountType = 'LDAP' | 'Local'

export interface LabelObj {
  text: string
}

export interface Account {
  id: string
  labels: LabelObj[]
  type: AccountType
  login: string
  password: string | null
}
