export interface Column<T, K extends keyof T> {
  key: K
  header: string
  Cell: (props: { row: T }) => React.ReactNode | string | number
}
