/// <reference types="cypress" />


interface ScrapeTableOptions {
  rowIndexForHeadings?: number,
  exportFileName?: string
  exportFilePath?: string,
  includeTimestamp?: boolean,
  propertyNameConvention?: string,
  applyDataTypeConversion?: boolean,
  removeAllNewlineCharacters?: boolean,
  decimalColumns?: string[]
}

interface DataTableI {
  rowCount(): number
  addItem(data: any): any[]
  getData(): any[]
  hasItem(item: any): any
  containsItem(property: any, searchTerm: any): any
  flagAsExported(downloadPath: string): void
  isPropertySorted(properties: any, sortOrders: any): boolean
  sumOfColumn(columnName: string, decimalPlaces = 2): number
  data: any[];
  propertyNames: any[];
  columnLabels: any[];
  exportStatus: string;
  info?: string
}


namespace Cypress {
  interface Chainable<Subject = any> {
    shouldHaveTrimmedText(equalTo: string | number | RegExp): Chainable<JQuery<HTMLElement>>;
    scrapeTable(options: ScrapeTableOptions = null): Chainable<DataTableI>;
  }
}