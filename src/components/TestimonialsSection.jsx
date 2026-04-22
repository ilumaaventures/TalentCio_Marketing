import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote:
      'TalentCIO transformed our hiring process. We went from spreadsheets to a fully automated pipeline in one week.',
    name: 'Priya Sharma',
    role: 'HR Head, Ilumaa Ventures',
    avatar: 'PS'
  },
  {
    quote:
      'The attendance module with geo-fencing has saved us hours of manual tracking every month.',
    name: 'Rahul Mehta',
    role: 'Operations Manager',
    avatar: 'RM'
  },
  {
    quote:
      'Onboarding new hires used to take days. With TalentCIO it takes hours. The pre-onboarding portal is excellent.',
    name: 'Ananya Singh',
    role: 'Talent Acquisition Lead',
    avatar: 'AS'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="max-w-3xl">
          <span className="section-kicker">Testimonials</span>
          <h2 className="section-title">Trusted by HR and operations teams that need clarity, not clutter</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="surface-card p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 font-['Sora'] text-sm font-bold text-blue-700">
                {testimonial.avatar}
              </div>
              <p className="mt-6 text-base leading-8 text-slate-700">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-slate-200 pt-5">
                <p className="font-semibold text-slate-950">{testimonial.name}</p>
                <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
