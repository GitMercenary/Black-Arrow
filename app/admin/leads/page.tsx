'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Lead, Region } from '@/lib/types/database';
import { X, MessageSquare, Filter } from 'lucide-react';

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'converted', 'lost'] as const;

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-warm-sand/20 text-warm-sand',
  contacted: 'bg-blue-500/20 text-blue-400',
  qualified: 'bg-purple-500/20 text-purple-400',
  converted: 'bg-green-500/20 text-green-400',
  lost: 'bg-red-500/20 text-red-400',
};

const SERVICE_LABELS: Record<string, { label: string; color: string }> = {
  'webdev_website-development': { label: 'Website Dev', color: 'bg-indigo-500/20 text-indigo-400' },
  'webdev_landing-page': { label: 'Landing Page', color: 'bg-emerald-500/20 text-emerald-400' },
  'webdev_business-site': { label: 'Business Site', color: 'bg-blue-500/20 text-blue-400' },
  'webdev_custom-web-app': { label: 'Custom Web App', color: 'bg-purple-500/20 text-purple-400' },
};

function getServiceTag(serviceInterest: string | null) {
  if (!serviceInterest) return null;
  return SERVICE_LABELS[serviceInterest] || { label: serviceInterest, color: 'bg-gray-500/20 text-gray-400' };
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [noteText, setNoteText] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();

    const [leadsRes, regionsRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('regions').select('*'),
    ]);

    if (leadsRes.data) setLeads(leadsRes.data);
    if (regionsRes.data) setRegions(regionsRes.data);
    setLoading(false);
  }

  async function updateLeadStatus(leadId: string, status: string) {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', leadId);

    if (!error) {
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: status as Lead['status'] } : l));
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, status: status as Lead['status'] });
      }
    }
    setSaving(false);
  }

  async function saveNotes(leadId: string) {
    setSaving(true);
    const supabase = createClient();

    const { error } = await supabase
      .from('leads')
      .update({ notes: noteText })
      .eq('id', leadId);

    if (!error) {
      setLeads(leads.map(l => l.id === leadId ? { ...l, notes: noteText } : l));
      if (selectedLead?.id === leadId) {
        setSelectedLead({ ...selectedLead, notes: noteText });
      }
    }
    setSaving(false);
  }

  const filteredLeads = leads.filter(lead => {
    if (filterStatus !== 'all' && lead.status !== filterStatus) return false;
    if (filterRegion !== 'all' && lead.region_id !== filterRegion) return false;
    return true;
  });

  const getRegionName = (regionId: string) => {
    const region = regions.find(r => r.id === regionId);
    return region?.code || '—';
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-unbounded font-bold mb-2">Leads</h1>
            <p className="text-gray-500 dark:text-cloud-dancer/60">{filteredLeads.length} leads</p>
          </div>
        </div>

        {/* Filters */}
        <Card hover={false} className="mb-6 p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500 dark:text-cloud-dancer/60" />
              <span className="text-sm text-gray-500 dark:text-cloud-dancer/60">Filters:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-sm focus:border-warm-sand focus:outline-none"
            >
              <option value="all">All Status</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={filterRegion}
              onChange={(e) => setFilterRegion(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md text-sm focus:border-warm-sand focus:outline-none"
            >
              <option value="all">All Regions</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
        </Card>

        {/* Leads Table */}
        <Card hover={false}>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-ui">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Name</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Email</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Company</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Service</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Region</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Budget</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Status</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Date</th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-cloud-dancer/60 font-hanken font-normal text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400 dark:text-cloud-dancer/40">
                      Loading...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-gray-400 dark:text-cloud-dancer/40">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-gray-200 dark:border-slate-ui/50 hover:bg-gray-100 dark:hover:bg-slate-ui/20 transition-colors">
                      <td className="py-4 px-4 font-medium">{lead.name}</td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{lead.email}</td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{lead.company || '—'}</td>
                      <td className="py-4 px-4">
                        {(() => {
                          const tag = getServiceTag(lead.service_interest);
                          return tag ? (
                            <span className={`px-2 py-1 rounded text-xs font-medium ${tag.color}`}>
                              {tag.label}
                            </span>
                          ) : (
                            <span className="text-gray-400 dark:text-cloud-dancer/40 text-sm">—</span>
                          );
                        })()}
                      </td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{getRegionName(lead.region_id)}</td>
                      <td className="py-4 px-4 text-gray-700 dark:text-cloud-dancer/80 text-sm">{lead.budget_range}</td>
                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs border-0 cursor-pointer ${STATUS_COLORS[lead.status]}`}
                        >
                          {STATUS_OPTIONS.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-4 px-4 text-gray-500 dark:text-cloud-dancer/60 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setNoteText(lead.notes || '');
                          }}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-slate-ui rounded transition-colors"
                          title="View Details"
                        >
                          <MessageSquare size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card hover={false} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-unbounded font-bold">{selectedLead.name}</h2>
                  <p className="text-gray-500 dark:text-cloud-dancer/60">{selectedLead.email}</p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-slate-ui rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Company</label>
                  <p>{selectedLead.company || '—'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Phone</label>
                  <p>{selectedLead.phone || '—'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Budget</label>
                  <p>{selectedLead.budget_range}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Service Interest</label>
                  {(() => {
                    const tag = getServiceTag(selectedLead.service_interest);
                    return tag ? (
                      <p className="mt-1"><span className={`px-3 py-1 rounded text-sm font-medium ${tag.color}`}>{tag.label}</span></p>
                    ) : (
                      <p>{selectedLead.service_interest || '—'}</p>
                    );
                  })()}
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Region</label>
                  <p>{getRegionName(selectedLead.region_id)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Status</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value)}
                    className={`mt-1 px-3 py-2 rounded text-sm border-0 cursor-pointer ${STATUS_COLORS[selectedLead.status]}`}
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-500 dark:text-cloud-dancer/60">Message</label>
                <p className="mt-1 p-3 bg-gray-100 dark:bg-slate-ui/30 rounded-md">{selectedLead.message}</p>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-500 dark:text-cloud-dancer/60 mb-2 block">Notes</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-deep-obsidian border border-gray-300 dark:border-slate-ui rounded-md focus:border-warm-sand focus:outline-none resize-none"
                  placeholder="Add notes about this lead..."
                />
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => saveNotes(selectedLead.id)}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Notes'}
                </Button>
              </div>

              <div className="text-sm text-gray-500 dark:text-cloud-dancer/60">
                Created: {new Date(selectedLead.created_at).toLocaleString()}
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
