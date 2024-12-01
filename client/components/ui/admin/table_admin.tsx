/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";

interface IProps {
  dataSource: any;
  column: any;
}

export default function AdminTable({ dataSource, column }: IProps) {
  return <Table dataSource={dataSource} columns={column} />;
}
