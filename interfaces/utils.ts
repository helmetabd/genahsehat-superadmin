export interface ButtonConfig {
    excel: boolean
    copy: boolean
    print: boolean
  }
  
  export interface Column {
    name: string
    label: string
    sortable: boolean
    checkable?: boolean
    textTypes?: any
    hidden?: boolean
    filterable: boolean
    width?: string
    bold?: boolean
    headerClass?: string
    routeName?: string
    class?: string
    isNumber?: boolean
    targetCollapsed?: boolean
    currency?: string
    fixedNumber?: number
    percentage?: { target: string; actual: string }
    custom?: any
    badge?: any
    dateConfig?: any
    offcanvas?: any
    stackedImage?: boolean
    isArray?: boolean
    isFirst?: boolean
    isLast?: boolean
    defaultValue?: any
    display?: string
    customizeRow?: boolean
    color?: boolean
    params?: { id: string; date: any }
    sticky?: boolean
  }
  
  export interface GroupHeader {
    title: string
    colspan: number
    class?: string
  }
  
  export interface CustomRow {
    value: string
    class: string
  }
  
  export interface Props {
    table_search?: boolean
    table_show?: boolean
    table_pagination?: boolean
    table_class?: string
    group?: boolean
    collapsed?: boolean
    sortBy?: string
    order?: number
    page_size?: number
    dataTable: any[]
    column: Column[]
    headerGroup?: GroupHeader[]
    buttons?: ButtonConfig
    customRow?: CustomRow
    copyTitle?: string
    headerRowClass?: string
    paginationClass?: string
  }
  
  export interface RenderColumn {
    text: string
    component?: string
    props?: any
    imageSrc?: string
    iconClass?: string
    uniqueFirst?: string
    iconColorObject?: string
    iconColor?: string
    parent?: RenderColumn
  }
  
  export interface FormField {
    [key: string]: string | number | null
  }
  