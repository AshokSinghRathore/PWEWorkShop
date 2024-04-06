import { Alert } from 'react-native';
import {Permission, RESULTS, request,requestMultiple} from 'react-native-permissions';

export async function requestPermission(permission: Permission):Promise<boolean> {

    const resp = await request(permission);
    if (resp === RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
 
}

export async function requestPermissions(permissions: Permission[]): Promise<boolean> {
  const resp = await requestMultiple(permissions);
  let granted = true;

  for (const [permission, result] of Object.entries(resp)) {
    if (result !== RESULTS.GRANTED) {
      granted = false;
    }
  }

  return granted;
}