import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {hsdLogo} from '../../dummy-logo';
export async function PrintBill(
  CustomerName,
  customerAddress,
  ContactNumber,
  orderData,
  orderType
) {
  await printLogo();
  await printCustomerInfo(CustomerName, customerAddress, ContactNumber);
  await BluetoothEscposPrinter.printText('Order Type : ' + orderType, {});
  await BluetoothEscposPrinter.printText('\r\n', {});
  await printOrderData(orderData);
  try {
  } catch (error) {
    console.log(error);
  }
}

async function printLogo() {
  await BluetoothEscposPrinter.printPic(hsdLogo, {});
}

async function printCustomerInfo(Name, address, mobile) {
  await BluetoothEscposPrinter.printText('\r\n', {});
  await BluetoothEscposPrinter.printText('Name : ' + Name, {});
  await BluetoothEscposPrinter.printText('\r\n', {});

  await BluetoothEscposPrinter.printText('Mobile : ' + mobile, {});
  await BluetoothEscposPrinter.printText('\r\n', {});

  await BluetoothEscposPrinter.printText('Address : ' + address, {});

  // black line

  await BluetoothEscposPrinter.printText('\r\n\r\n', {});
}

const padString = (str, width) => {
  const padLength = width - str.length;
  return str + ' '.repeat(padLength > 0 ? padLength : 0);
};
const printOrderData = async orderData => {
  // Print header
  await BluetoothEscposPrinter.printText(
    'Cloth Type     Quantity     DryClean Type\n',
    {fontSize: 10}, // Adjust the font size as needed
  );

  // Print data rows
  for (const item of orderData) {
    const {DryCleanClothTypeValue, Quantity, DryCleanTypeValue} = item;
    const row = `${padString(DryCleanClothTypeValue, 12)} ${padString(
      Quantity.toString(),
      12,
    )} ${padString(DryCleanTypeValue, 12)}\n`;

    await BluetoothEscposPrinter.printText(row, {});
  }
};
