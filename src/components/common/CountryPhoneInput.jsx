import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Search, Check } from 'lucide-react';
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  parsePhoneNumber,
  formatPhoneNumber,
  validatePhoneNumber,
  findCountryByCode
} from '../../utils/countries';

export default function CountryPhoneInput({
  value = '',
  onChange,
  onBlur,
  error,
  disabled = false,
  required = false,
  id = 'phone',
  name = 'phone',
  className = '',
  defaultCountryCode = 'IN'
}) {
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Parse initial or incoming value
  const parsed = useMemo(() => {
    return parsePhoneNumber(value, defaultCountryCode);
  }, [value, defaultCountryCode]);

  const [selectedCountry, setSelectedCountry] = useState(parsed.country);
  const [nationalNumber, setNationalNumber] = useState(parsed.nationalNumber);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Keep internal state synchronized with incoming value prop if changed externally
  useEffect(() => {
    setSelectedCountry(parsed.country);
    setNationalNumber(parsed.nationalNumber);
  }, [parsed]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filtered countries for search
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return COUNTRIES;
    const q = searchQuery.trim().toLowerCase();
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery('');

    // If there's a national number, enforce new country max length
    const slicedDigits = nationalNumber.slice(0, country.maxDigits);
    setNationalNumber(slicedDigits);

    const fullPhone = formatPhoneNumber(country, slicedDigits);
    const err = validatePhoneNumber(country, slicedDigits, required);
    onChange?.(fullPhone, {
      country,
      nationalNumber: slicedDigits,
      isValid: !err,
      error: err
    });
  };

  const handleNumberChange = (event) => {
    const rawDigits = event.target.value.replace(/\D/g, '');
    const sliced = rawDigits.slice(0, selectedCountry.maxDigits);
    setNationalNumber(sliced);

    const fullPhone = formatPhoneNumber(selectedCountry, sliced);
    const err = validatePhoneNumber(selectedCountry, sliced, required);
    onChange?.(fullPhone, {
      country: selectedCountry,
      nationalNumber: sliced,
      isValid: !err,
      error: err
    });
  };

  const handleInputBlur = (e) => {
    onBlur?.(e);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className={`flex rounded-xl border bg-white shadow-sm transition-all focus-within:ring-2 ${
          error
            ? 'border-red-300 focus-within:border-red-400 focus-within:ring-red-100'
            : 'border-slate-200 focus-within:border-[#ea7c00] focus-within:ring-[#ea7c00]/20'
        } ${disabled ? 'bg-slate-50 opacity-70 cursor-not-allowed' : ''}`}
      >
        {/* Country Code Trigger Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 px-3 py-2.5 border-r border-slate-200 bg-slate-50/70 hover:bg-slate-100 rounded-l-xl text-slate-700 text-sm font-semibold transition shrink-0 select-none focus:outline-none"
          title={`Selected: ${selectedCountry.name} (${selectedCountry.dialCode})`}
        >
          <span className="text-lg leading-none" role="img" aria-label={selectedCountry.name}>
            {selectedCountry.flag}
          </span>
          <span className="text-xs font-bold tracking-tight text-slate-800">
            {selectedCountry.dialCode}
          </span>
          <ChevronDown
            size={14}
            className={`text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* National Number Input */}
        <input
          type="tel"
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          value={nationalNumber}
          onChange={handleNumberChange}
          onBlur={handleInputBlur}
          placeholder={`e.g. ${selectedCountry.format}`}
          maxLength={selectedCountry.maxDigits}
          className="flex-1 w-full bg-transparent px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-r-xl"
        />
      </div>

      {/* Floating Searchable Country Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 z-50 w-72 max-w-[90vw] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Box */}
          <div className="p-2.5 border-b border-slate-100 bg-slate-50/80">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search country or code..."
                className="w-full pl-8 pr-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white focus:border-[#ea7c00] focus:ring-1 focus:ring-[#ea7c00] outline-none text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-60 overflow-y-auto divide-y divide-slate-50 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 font-medium">
                No matching countries found
              </div>
            ) : (
              filteredCountries.map((country) => {
                const isSelected = country.code === selectedCountry.code;
                return (
                  <button
                    key={`${country.code}-${country.dialCode}`}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-amber-50/80 font-bold text-[#ea7c00]'
                        : 'hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-base shrink-0 leading-none">{country.flag}</span>
                      <span className="truncate">{country.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {country.dialCode}
                      </span>
                      {isSelected && <Check size={13} className="text-[#ea7c00]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
