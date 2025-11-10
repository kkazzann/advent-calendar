export type ApiResponse = {
  code: 200 | 404 | 500;
  message: string;
  executionTime: number;
  dataOrigin?: 'cache' | 'googleAPIs';
  data: { [key: string]: any };
};
