'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Region, Lead } from '@/lib/types/database';
import { MapPin, Phone, Globe, Clock, Save } from 'lucide-react';

interface RegionStats {
  totalLeads: number;
  newLeads: number;
  convertedLeads: number;
}

export default function SettingsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [regionStats, setRegionStats] = useState<Record<string, RegionStats>>({});
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    phone: '',
    address: '',
    timezone: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();

    const [regionsRes, leadsRes] = await Promise.all([
      supabase.from('regions').select('*').order('code'),
      supabase.from('leads').select('region_id, status'),
    ]);

    if (regionsRes.data) {
      setRegions(regionsRes.data);
    }

    if (leadsRes.data) {
      // Calculate stats per region
      const stats: Record<string, RegionStats> = {};
      leadsRes.data.forEach((lead: Pick<Lead, 'region_id' | 'status'>) => {
        if (!stats[lead.region_id]) {
          stats[lead.region_id] = {
            totalLeads: 0,
            newLeads: 0,
            convertedLeads: 0,
          };
        }
        stats[lead.region_id].totalLeads++;
        if (lead.status === 'new') stats[lead.region_id].newLeads++;
        if (lead.status === 'converted') stats[lead.region_id].convertedLeads++;
      });
      setRegionStats(stats);
    }

    setLoading(false);
  }

  function startEditing(region: Region) {
    setEditingId(region.id);
    setEditForm({
      phone: region.phone || '',
      address: region.address || '',
      timezone: region.timezone || '',
    });
  }

  function cancelEditing() {
    setEditingId(null);
    setEditForm({ phone: '', address: '', timezone: '' });
  }

  async function saveRegion(regionId: string) {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('regions')
      .update({
        phone: editForm.phone,
        address: editForm.address,
        timezone: editForm.timezone,
        updated_at: new Date().toISOString(),
      })
      .eq('id', regionId);

    if (!error) {
      setRegions(regions.map(r =>
        r.id === regionId
          ? { ...r, phone: editForm.phone, address: editForm.address, timezone: editForm.timezone }
          : r
      ));
      setEditingId(null);
    }

    setSaving(false);
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-unbounded font-bold mb-2">Regional Settings</h1>
          <p className="text-cloud-dancer/60">
            Manage contact information and settings for each region
          </p>
        </div>

        {loading ? (
          <Card hover={false} className="p-8 text-center">
            <p className="text-cloud-dancer/60">Loading settings...</p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {regions.map((region) => {
              const isEditing = editingId === region.id;
              const stats = regionStats[region.id] || {
                totalLeads: 0,
                newLeads: 0,
                convertedLeads: 0,
              };

              return (
                <Card key={region.id} hover={false} className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-unbounded font-bold">{region.name}</h2>
                        <span className="px-3 py-1 bg-warm-sand/20 text-warm-sand text-sm rounded font-mono">
                          {region.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-cloud-dancer/60 mt-2">
                        <span className="flex items-center gap-1">
                          <Globe size={14} />
                          {region.currency}
                        </span>
                        <span>•</span>
                        <span>{stats.totalLeads} leads</span>
                        <span>•</span>
                        <span>{stats.newLeads} new</span>
                        <span>•</span>
                        <span>{stats.convertedLeads} converted</span>
                      </div>
                    </div>

                    {!isEditing ? (
                      <Button
                        variant="secondary"
                        onClick={() => startEditing(region)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          onClick={() => saveRegion(region.id)}
                          disabled={saving}
                        >
                          <Save size={16} className="mr-2" />
                          {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={cancelEditing}
                          disabled={saving}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-cloud-dancer/60 mb-2">
                        <Phone size={14} />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-md focus:border-warm-sand focus:outline-none"
                          placeholder="+44 20 1234 5678"
                        />
                      ) : (
                        <p className="text-cloud-dancer">{region.phone || '—'}</p>
                      )}
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="flex items-center gap-2 text-sm text-cloud-dancer/60 mb-2">
                        <Clock size={14} />
                        Timezone
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.timezone}
                          onChange={(e) => setEditForm({ ...editForm, timezone: e.target.value })}
                          className="w-full px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-md focus:border-warm-sand focus:outline-none"
                          placeholder="Europe/London"
                        />
                      ) : (
                        <p className="text-cloud-dancer">{region.timezone || '—'}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-cloud-dancer/60 mb-2">
                        <MapPin size={14} />
                        Address
                      </label>
                      {isEditing ? (
                        <textarea
                          value={editForm.address}
                          onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                          rows={2}
                          className="w-full px-4 py-2 bg-deep-obsidian border border-slate-ui rounded-md focus:border-warm-sand focus:outline-none resize-none"
                          placeholder="123 Tech Street, London, UK"
                        />
                      ) : (
                        <p className="text-cloud-dancer">{region.address || '—'}</p>
                      )}
                    </div>
                  </div>

                  {/* Budget Ranges Info */}
                  <div className="mt-6 pt-6 border-t border-slate-ui">
                    <h4 className="text-sm font-medium mb-3 text-cloud-dancer/80">
                      Budget Ranges for Lead Forms
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {region.code === 'UK' && (
                        <>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            £1,500+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            £5,000+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            £10,000+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            £25,000+
                          </span>
                        </>
                      )}
                      {region.code === 'UAE' && (
                        <>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            AED 5,000+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            AED 20,000+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            AED 40,000+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            AED 100,000+
                          </span>
                        </>
                      )}
                      {region.code === 'IND' && (
                        <>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            ₹1.5L+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            ₹5L+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            ₹10L+
                          </span>
                          <span className="px-3 py-1 bg-slate-ui/50 text-cloud-dancer/80 text-xs rounded">
                            ₹25L+
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-cloud-dancer/60 mt-2">
                      These budget options are shown in the contact form for this region
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Info Section */}
        <Card hover={false} className="mt-8 p-6 bg-slate-ui/20">
          <h3 className="text-lg font-unbounded font-bold mb-3">About Regional Settings</h3>
          <div className="text-sm text-cloud-dancer/70 space-y-2">
            <p>
              • Regional settings control how contact information is displayed on your website
            </p>
            <p>
              • Phone numbers and addresses are shown in the footer and contact page based on the user's detected region
            </p>
            <p>
              • Budget ranges are automatically displayed in the contact form based on the region's currency
            </p>
            <p>
              • Timezone settings help with lead follow-up scheduling (future feature)
            </p>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
