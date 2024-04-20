import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {hsdLogo} from '../../dummy-logo';
export async function PrintBill(
  CustomerName,
  customerAddress,
  ContactNumber,
  orderData,
  orderType,
  costs,
  pickData,
  dropData,
) {
  try {
    await printLogo();
    await printCustomerInfo(CustomerName, customerAddress, ContactNumber);
    await BluetoothEscposPrinter.printText('Order Type : ' + orderType, {});
    await BluetoothEscposPrinter.printText('\r\n', {});
    await printOrderData(orderData, orderType);
    await printPrice(costs);
    await printDates('Pickup', pickData);
    await printDates('Drop', dropData);
    await BluetoothEscposPrinter.printText('Signature : _______________', {});
    await BluetoothEscposPrinter.printText('\r\n', {});
    await BluetoothEscposPrinter.printText('\r\n\r\n', {});

    await BluetoothEscposPrinter.printText(
      '-----------Thank You------------',
      {},
    );
    await BluetoothEscposPrinter.printText('\r\n\r\n', {});
    await BluetoothEscposPrinter.printText('\r\n\r\n', {});
  } catch (error) {
    console.log(error);
  }
}

async function printDates(label, data) {
  await BluetoothEscposPrinter.printText(label + 'Time : ' + data.time, {});
  await BluetoothEscposPrinter.printText('\r\n', {});
  await BluetoothEscposPrinter.printText(label + 'Date : ' + data.date, {});
  await BluetoothEscposPrinter.printText('\r\n', {});
}

async function printPrice(data) {
  if (data.packaging) {
    await BluetoothEscposPrinter.printText('Packaging : ' + data.price, []);
    await BluetoothEscposPrinter.printText('\r\n', {});
  }
  await BluetoothEscposPrinter.printText('Delivery : ' + data.delivery, {});

  await BluetoothEscposPrinter.printText('\r\n', {});
  await BluetoothEscposPrinter.printText('Total Cost : ' + data.price, {});
  await BluetoothEscposPrinter.printText('\r\n', {});
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
const printOrderData = async (orderData, orderType) => {
  // Print header


  if (orderType == 'Dry Clean') {
    // Print data rows
    await BluetoothEscposPrinter.printText(
      'Cloth      Quantity     DryClean\n',
      {fontSize: 10}, // Adjust the font size as needed
    );
    for (const item of orderData) {
      const {DryCleanClothTypeValue, Quantity, DryCleanTypeValue} = item;
      const row = `${padString(DryCleanClothTypeValue, 15)} ${padString(
        Quantity.toString(),
        6,
      )} ${padString(DryCleanTypeValue, 12)}\n`;

      await BluetoothEscposPrinter.printText(row, {});
    }
  } else {
    await BluetoothEscposPrinter.printText(
      'Cloth      Quantity     Press\n',
      {fontSize: 10}, // Adjust the font size as needed
    );
    for (const item of orderData) {
      const {ClothType, Quantity, PressType} = item;
      const row = `${padString(ClothType, 12)} ${padString(
        Quantity.toString(),
        6,
      )} ${padString(PressType, 12)}\n`;

      await BluetoothEscposPrinter.printText(row, {});
    }
  }
};
