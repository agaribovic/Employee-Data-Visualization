import { useState, useEffect } from 'react';
import { DefaultApi, TimeChange } from '../api';

export const useTimeChanges = () => {
  const [data, setData] = useState<TimeChange[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = new DefaultApi();
    const controller = new AbortController();

    api.listTimeChanges({ signal: controller.signal })
      .then((res) => {
        setData(res.data);

        if ('Notification' in window) {
          new Notification('in-motion WiB Mitarbeiterdaten-Visualisierung', {
            body: 'Die Daten wurden erfolgreich in Kreisdiagrammen geladen.',
            silent: false,
          });
        }
      })
      .catch((err: unknown) => {
        if (!controller.signal.aborted) {
          const message = err instanceof Error ? err.message : 'Unknown error';
          setError(message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { data, loading, error };
};
