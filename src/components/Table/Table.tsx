import * as React from "react";
import { Badge, Container, Grid, Loading, Table, Text } from "@nextui-org/react";
import { useState } from "react";
import { DIRECTION } from "../../enum";

interface IAppTable {
  headers: Array<string>;
  items: Array<any>;
  rows:number;
  page:number;
  setPage(page:number):void;
  onSortChange(column:string,drection:string):void;
}

export default function AppTable({ headers, items, rows, page, setPage, onSortChange }: IAppTable) {
  /**
   * 
   * @param newPage Setting the page
   */
  const handleChangePage = ( newPage: number) => {
    setPage(newPage);
  };
  const [sortColumn,setSortColum] = useState('');
  const [sortDirection,setSortDirection] = useState('');

  /**
   * Sorting the columns in 
   * @param value column name and direction
   */
  const handleSortColumnChange = (value:any) => {
    let direction = ""
    if(value.column === sortColumn){
      if(sortDirection === DIRECTION.asc) { setSortDirection(DIRECTION.des); direction=DIRECTION.des; }
      else { setSortDirection(DIRECTION.asc); direction=DIRECTION.asc; }
    }else{ setSortColum(value.column); setSortDirection(DIRECTION.asc); direction=DIRECTION.asc}
    onSortChange(value.column,direction);
  }

  return items.length > 0 && headers.length > 0 ? (
  <Container css={{w:'auto'}}>
    <Table
      bordered
      shadow={false}
      color="secondary"
      aria-label="Example pagination  table"
      css={{
        height: "auto",
        minWidth: "auto",
        w:"auto"
      }}
      selectionMode="multiple"
      onSortChange={handleSortColumnChange}
    >
      <Table.Header >
        {headers.map((column) => <Table.Column css={{padding:"0 1rem"}} allowsSorting allowsResizing key={column}><div style={{display:"inline-flex"}}><Text size={'$sm'} css={{fontWeight:'bold'}}>{column} </Text> {sortColumn === column ? <Badge color={"primary"} css={{marginLeft:"3px"}} size={'sm'}>{sortDirection}</Badge> : undefined}</div>
        </Table.Column>)}
      </Table.Header>
      <Table.Body>
         {items
          .map((row,index) => {
            return (
              <Table.Row key={(index + page) * rows}>
                {headers.map((column) => {
                  const value = row[column];
                  return (
                    <Table.Cell css={{padding:"0 1rem"}}>
                      {column === "Tags" ? (
                        <>
                          <Badge size={'sm'} color="primary">{row[column]["app-name"]}</Badge>
                          <Badge size={'sm'} color="warning">{row[column]["business-unit"]}</Badge>
                          <Badge size={'sm'} color="success">{row[column]["environment"]}</Badge>
                        </>
                      ) : (
                        <Text small>{value}</Text>
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={rows}
        page={page}
        onPageChange={(page) => handleChangePage(page)}
      />  
    </Table>
    
    </Container>
  ): (
    <Container>
     <Grid>
        <Loading type="spinner" size="lg" />
      </Grid>
    </Container>
  );
}
