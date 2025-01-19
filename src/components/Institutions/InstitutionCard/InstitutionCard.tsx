import { supabase } from '@/supabase/supabaseClient';
import { Institution } from '@/types/institutions/types';
import React, { useEffect, useState } from 'react'
import { BsBuildingGear } from 'react-icons/bs';

const InstitutionCard = () => {
    const [institutions, setInstitutions] = useState<Institution[]>([]);

useEffect(() => {
    const fetchInstitutions = async () => {
      const { data, error } = await supabase.from("institutions").select("*");
      if (error) {
        console.error("Error fetching institutions:", error);
      } else {
        setInstitutions(data || []);
      }
    };

    fetchInstitutions();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {institutions.length === 0 ? (
              <div className="col-span-1 md:col-span-3 text-center text-gray-400">
                No hay instituciones registradas.
              </div>
            ) : (
              institutions.map((institution) => (
                <div
                  key={institution.id}
                  className="bg-zinc-900/50 border border-zinc-700/50 p-4 rounded-md shadow-md"
                >
                  <p className="flex text-xl font-bold mb-2">
                    <span className="text-zinc-500 mr-4 text-4xl p-4 border border-zinc-700/50 rounded-md bg-zinc-900 ">
                      <BsBuildingGear />
                    </span>
                    {institution.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {institution.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {institution.phone_number}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {institution.address}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {institution.city}
                  </p>
                  <p>
                    <strong>País:</strong> {institution.country}
                  </p>
                </div>
              ))
            )}
          </div>
  )
}

export default InstitutionCard