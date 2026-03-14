import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';
import { api } from '../services/api';

const COUNTRIES = [
  'Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Bahrain', 'Oman',
  'Jordan', 'Iraq', 'Lebanon', 'Turkey', 'Germany', 'United Kingdom', 'France', 'Italy',
  'Spain', 'India', 'Pakistan', 'Nigeria', 'South Africa', 'Kenya', 'Morocco', 'Malaysia',
  'Other',
];

const SYSTEMS = [
  'Modified Bitumen', 'Synthetic Membranes', 'Liquid Waterproofing',
  'Cement-Based Systems', 'Primers & Mastics', 'Hot Applied Bitumen', 'Specialty Tapes',
];

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().min(1, 'Company is required'),
  country: z.string().min(1, 'Country is required'),
  role: z.string().min(1, 'Please select your role'),
  supportType: z.string().min(1, 'Support type is required'),
  description: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function SupportPage() {
  const [searchParams] = useSearchParams();
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const prefillSystem = searchParams.get('system');

  useEffect(() => {
    if (prefillSystem) {
      const formatted = prefillSystem.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      const match = SYSTEMS.find((s) => s.toLowerCase().includes(prefillSystem.replace(/-/g, ' ')));
      if (match) setSelectedSystems([match]);
      else setSelectedSystems([formatted]);
    }
  }, [prefillSystem]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await api.submitSupport({ ...data, systems: selectedSystems.join(', ') });
      toast.success('Request submitted! Our team will contact you within 24 hours.');
      reset();
      setSelectedSystems([]);
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleSystem = (sys: string) => {
    setSelectedSystems((prev) =>
      prev.includes(sys) ? prev.filter((s) => s !== sys) : [...prev, sys]
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      <Toaster position="top-right" />
      <div className="container-main py-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 text-center"
          >
            <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-2">Get Help</p>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Request Technical Support</h1>
            <p className="text-slate-600">
              Our technical team will respond within 24 hours with product specifications and application guidance.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6"
          >
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                <input
                  {...register('name')}
                  placeholder="John Smith"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john@company.com"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Company + Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Company *</label>
                <input
                  {...register('company')}
                  placeholder="Your company"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                />
                {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Country *</label>
                <select
                  {...register('country')}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="">Select country</option>
                  {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
              </div>
            </div>

            {/* Role + Support Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Stakeholder Role *</label>
                <select
                  {...register('role')}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="">Select role</option>
                  {['Consultant', 'Engineer', 'Distributor', 'Applicator', 'Developer', 'Architect', 'Other'].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Support Type *</label>
                <select
                  {...register('supportType')}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm"
                >
                  <option value="">Select type</option>
                  {['Product Selection', 'System Design', 'Application Method', 'Technical Specifications', 'Compliance & Certification', 'Other'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.supportType && <p className="text-red-500 text-xs mt-1">{errors.supportType.message}</p>}
              </div>
            </div>

            {/* Systems */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">System of Interest</label>
              <div className="flex flex-wrap gap-2">
                {SYSTEMS.map((sys) => (
                  <button
                    key={sys}
                    type="button"
                    onClick={() => toggleSystem(sys)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                      selectedSystems.includes(sys)
                        ? 'bg-amber-400 border-amber-400 text-slate-900'
                        : 'border-slate-200 text-slate-600 hover:border-amber-300'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Project Description (optional)</label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Describe your project requirements, substrate, area, and any specific challenges..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-400 text-sm resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-amber-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-amber-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
