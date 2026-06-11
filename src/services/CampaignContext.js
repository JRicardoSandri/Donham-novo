import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadCampaignState, saveCampaignState } from './campaignService';

const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
  const [state, setState] = useState(null);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    loadCampaignState().then(setState);
  }, []);

  useEffect(() => {
    if (!state) return;
    saveCampaignState(state).then((saved) => setSaveError(!saved));
  }, [state]);

  return (
    <CampaignContext.Provider value={{ state, setState, saveError }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const value = useContext(CampaignContext);
  if (!value) throw new Error('useCampaign deve ser usado dentro de CampaignProvider');
  return value;
}
