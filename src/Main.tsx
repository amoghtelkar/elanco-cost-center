import { Container, Grid, Input, Text } from "@nextui-org/react";
import AppTable from "./components/Table/Table"
import { Key, useEffect, useState } from "react";
import { getApplicationData } from "./services";
import { getDropDownValues } from "./services";
import { getResourceData } from "./services";
import { IData } from "./interfaces";
import { AppDropDown } from "./components/DropDown/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "./store/slices/data";
import { DIRECTION } from "./enum";

export const Main = () => {

  const [applicationsDVs, setApplicationsDVs] = useState<Array<string>>([]);
  const [resourcesDVs, setResourcesDVs] = useState<Array<string>>([]);
  const [items, setItems] = useState<Array<IData>>([]);
  const [headers, setHeaders] = useState<Array<string>>([]);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [resource, setResource] = useState("");
  const [application, setApplication] = useState("");
  const rowsDVs = [10, 20, 50, 100];
  const { data } = useSelector((state:any) => state.data);
  const dispatch = useDispatch();
  /**
   * Method to get the Applications Dropdown values
   */
  const getApplicationsDVs = async () => {
    const result: Array<string> = await getDropDownValues('applications');
    setApplicationsDVs(result);
  }
  /**
   * Method to get Resources dropdown values
   */
  const getResourcesDVs = async () => {
    const result: Array<string> = await getDropDownValues('resources');
    setResourcesDVs(result);
  }

  useEffect(() => {
    getResourcesDVs();
    getApplicationsDVs();
  }, []);

  /**
   * Setting the value of Resource Dropdown
   * @param value 
   */
  const handleResourcesChange = async (value: Key) => {

    setResource(value.toString());
    setApplication("Applications");
    const result: Array<any> = await getResourceData(value.toString());
    setItems(result);
    dispatch(setData(result));
    setHeaders(Object.keys(result[0]));
    setPage(0);
  }

  /**
   * 
   * @param value Setting the value of Application dropdown
   */
  const handleApplicationsChange = async (value: Key) => {
    setApplication(value.toString());
    setResource("Resources");
    const result = await getApplicationData(value.toString());
    setItems(result);
    dispatch(setData(result));
    setHeaders(Object.keys(result[0]));
    setPage(0);
  }

  /**
   * Method to filter the items based on search input
   * @param event event triggerd
   */
  const handleSearchChange = (event: any) => {
    const { value } = event.target;
    let tempItems = [...data];
    tempItems = tempItems.filter((item) => {

      return item.ConsumedQuantity.toLowerCase().includes(value.toLowerCase()) ||
        item.Cost.toLowerCase().includes(value.toLowerCase()) ||
        item.Date.toLowerCase().includes(value.toLowerCase()) ||
        item.InstanceId.toLowerCase().includes(value.toLowerCase()) ||
        item.Location.toLowerCase().includes(value.toLowerCase()) ||
        item.MeterCategory.toLowerCase().includes(value.toLowerCase()) ||
        item.ResourceGroup.toLowerCase().includes(value.toLowerCase()) ||
        item.ResourceLocation.toLowerCase().includes(value.toLowerCase()) ||
        item.ServiceName.toLowerCase().includes(value.toLowerCase()) ||
        item.Tags["app-name"].toLowerCase().includes(value.toLowerCase()) ||
        item.Tags["business-unit"].toLowerCase().includes(value.toLowerCase()) ||
        item.Tags["environment"].toLowerCase().includes(value.toLowerCase()) ||
        item.UnitOfMeasure.toLowerCase().includes(value.toLowerCase())
    });
    setItems(tempItems);
    setPage(0);
  }

  /**
   * Method to update the row
   * @param value row number
   */
  const handleRowChange = (value: number) => {
    setRows(value);
    setPage(0);
  }

  /**
   * Method to sort the items
   * @param column column name
   * @param direction 'asc' or 'desc'
   */
  const handleSortChange = (column:string,direction:string) => {
    const tempItems = [...data];
    tempItems.sort((a:any,b:any) => direction === DIRECTION.asc ?  a[column].toString().localeCompare(b[column]) : b[column].toString().localeCompare(a[column]) );
    setItems(tempItems);
  }
  return (
    <Container css={{w:'auto'}}>

      <Grid.Container gap={2} justify="center">
        <Grid >
          <AppDropDown buttonColor="primary" value={resource} placeholder="Rescorces" menuColor="primary" onAction={handleResourcesChange} dropDownValues={resourcesDVs} />
        </Grid>
        <Grid >
          <AppDropDown buttonColor="success" value={application} placeholder="Applications" menuColor="success" onAction={handleApplicationsChange} dropDownValues={applicationsDVs} />
        </Grid>
        {application || resource ? 
        <Grid>
          <AppDropDown buttonColor="secondary" value={rows} placeholder="Select Rows" menuColor="warning" onAction={handleRowChange} dropDownValues={rowsDVs} />
        </Grid>
        : null}
        {application || resource ? 
        <Grid>
          <Input clearable placeholder="Search" onChange={handleSearchChange} />
        </Grid>
        : null }
      </Grid.Container>
      <Grid.Container gap={2} justify="center" >
        <Grid css={{w:"auto"}}>
          {resource || application ?
            <AppTable headers={headers} items={items} rows={rows} page={page} setPage={setPage} onSortChange={handleSortChange}/>
            :
            <Text>Please select Resource or Application from the dropdowns</Text>
          }
        </Grid>
      </Grid.Container>
    </Container>
  )
}