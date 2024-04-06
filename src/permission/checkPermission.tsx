import {
  RESULTS,
  check,
  Permission,
  checkMultiple,
} from 'react-native-permissions';
export async function checkPermission(
  checkPermission: Permission,
): Promise<boolean> {
  const permission = await check(checkPermission);
  if (permission === RESULTS.GRANTED) {
    return true;
  } else {
    return false;
  }
}

export async function checkPermissions(
  checkPermissions: Permission[],
): Promise<boolean> {
  let granted = true;
  for (const permission of checkPermissions) {
    const result = await check(permission);
    if (result != RESULTS.GRANTED) {
      granted = false;
    }
  }

  return granted;
}
