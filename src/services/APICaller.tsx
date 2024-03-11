import axios, {AxiosResponse} from 'axios';

interface FetchApiDataResponse {
  data: any;
}

const fetchApiData = async (
  endpoint: string,
  limit: number,
  params: any,
): Promise<any> => {
  try {
    const response: AxiosResponse<FetchApiDataResponse> = await axios.get(
      endpoint,
      {
        params: {
          api_key: 'hKd8RAuyG9yTm72kRFWoMZ7TrD4smRQk',
          limit: limit,
          ...params,
        },
      },
    );
    return response?.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default fetchApiData;
