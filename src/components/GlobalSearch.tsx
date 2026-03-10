import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { SEARCH_DATA, SearchResult } from '../data/searchData';

interface GlobalSearchProps {
  onNavigate: (targetSection: string, scrollToId?: string) => void;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export default function GlobalSearch({ onNavigate, isMobile = false, onCloseMobile }: GlobalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      if (filteredResults.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
        } else if (e.key === 'Enter' && filteredResults[selectedIndex]) {
          e.preventDefault();
          handleResultClick(filteredResults[selectedIndex]);
        }
      }

      if (e.key === 'Escape') {
        setSearchQuery('');
        setFilteredResults([]);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredResults, selectedIndex]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = SEARCH_DATA.filter((item) => {
        const titleMatch = item.title.toLowerCase().includes(query);
        const keywordMatch = item.keywords.some((keyword) => keyword.toLowerCase().includes(query));
        const breadcrumbMatch = item.breadcrumb.toLowerCase().includes(query);
        return titleMatch || keywordMatch || breadcrumbMatch;
      });
      setFilteredResults(results);
      setSelectedIndex(0);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    onNavigate(result.targetPage, result.scrollToId);
    setSearchQuery('');
    setFilteredResults([]);

    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }

    if (result.scrollToId) {
      setTimeout(() => {
        const element = document.getElementById(result.scrollToId!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.boxShadow = '0 0 0 3px rgba(201,168,76,0.5)';
          element.style.borderRadius = '8px';
          element.style.transition = 'box-shadow 0.3s ease';
          setTimeout(() => {
            element.style.boxShadow = '';
          }, 2000);
        }
      }, 300);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !searchInputRef.current?.contains(event.target as Node)
      ) {
        setSearchQuery('');
        setFilteredResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9b8fb5',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Velour... e.g. rate card, hooks, B-roll"
          style={{
            width: '100%',
            padding: '10px 40px 10px 36px',
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${searchQuery ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '8px',
            color: '#f0ebff',
            fontSize: '13px',
            outline: 'none',
            transition: 'all 0.2s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '11px',
            color: '#7a6f8f',
            fontWeight: 600,
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(255,255,255,0.05)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          Cmd+K
        </div>
      </div>

      {searchQuery && filteredResults.length > 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: '#1a0f2e',
            border: '1.5px solid rgba(201,168,76,0.3)',
            borderRadius: '12px',
            padding: '8px',
            maxHeight: '280px',
            overflowY: 'auto',
            zIndex: 10000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredResults.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                style={{
                  padding: '10px 12px',
                  background:
                    selectedIndex === filteredResults.indexOf(result)
                      ? 'rgba(201,168,76,0.15)'
                      : 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f0ebff',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  setSelectedIndex(filteredResults.indexOf(result));
                  e.currentTarget.style.background = 'rgba(201,168,76,0.15)';
                }}
                onMouseLeave={(e) => {
                  if (selectedIndex !== filteredResults.indexOf(result)) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: '2px' }}>{result.title}</div>
                <div style={{ fontSize: '11px', color: '#9b8fb5' }}>{result.breadcrumb}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {searchQuery && filteredResults.length === 0 && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            background: '#1a0f2e',
            border: '1.5px solid rgba(201,168,76,0.3)',
            borderRadius: '12px',
            padding: '20px',
            zIndex: 10000,
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f0ebff', marginBottom: '6px' }}>
            No results for "{searchQuery}"
          </div>
          <p style={{ fontSize: '12px', color: '#9b8fb5', fontStyle: 'italic', margin: 0 }}>
            Try searching for a page name or feature
          </p>
        </div>
      )}
    </div>
  );
}
