export async function serviceResponse<TResponse>(
  service: () => Promise<[string] | [null, TResponse]>
): Promise<[string] | [null, TResponse]> {
  try {
    return await service();
  } catch (exception) {
    if (exception instanceof Error) {
      return [exception.message];
    }

    return [String(exception)];
  }
}
