/**
 * @description 주어진 startZ, endZ를 이용해 Connect RPC API에 사용할 filter 문자열 생성
 */
export function buildFilter({
  startZ,
  endZ,
}: {
  startZ: string;
  endZ: string;
}): string {
  return `create_time >= "${startZ}" AND create_time < "${endZ}"`;
}
