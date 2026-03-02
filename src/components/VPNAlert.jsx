import React from 'react';

const TITLE_GRADIENT = 'linear-gradient(to bottom, #0a246a 0%, #3169c4 6%, #2663d3 50%, #1941a5 95%)';

export default function VPNAlert({ onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: 'Tahoma, sans-serif',
        }}>
            <div style={{
                background: '#ece9d8',
                width: 400,
                border: '3px solid #0831d9',
                borderRadius: '8px 8px 0 0',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.5), inset 1px 1px 0 #fff',
                padding: 0,
            }}>
                {/* Title Bar */}
                <div style={{
                    background: TITLE_GRADIENT,
                    padding: '4px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '5px 5px 0 0',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ fontSize: 14 }}>ℹ️</span>
                        <span style={{ color: '#fff', fontSize: 11, fontWeight: 'bold', textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
                            System Notification - Connectivity
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            width: 21, height: 21,
                            background: 'linear-gradient(to bottom, #e47d63, #b6371b)',
                            border: '1px solid #7d2613',
                            borderRadius: 3,
                            color: '#fff',
                            fontSize: 10,
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.4)'
                        }}>X</button>
                </div>

                <div style={{ padding: 20, display: 'flex', gap: 15 }}>
                    <div style={{ fontSize: 32 }}>🌐</div>
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 10, color: '#000' }}>
                            Connection Warning
                        </div>
                        <div style={{ fontSize: 11, color: '#000', lineHeight: '1.4' }}>
                            We've detected that some region-based restrictions (especially in India) might block our database services (Supabase).
                            <br /><br />
                            If you don't see any projects or data loading, please <strong>use a VPN</strong> for the best experience.
                        </div>
                    </div>
                </div>

                <div style={{ padding: '0 15px 15px', textAlign: 'right' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '4px 20px',
                            background: '#ece9d8',
                            border: '1px solid #0054e3',
                            borderRadius: 3,
                            fontFamily: 'Tahoma',
                            fontSize: 11,
                            cursor: 'pointer',
                            boxShadow: 'inset -2px -2px 1px #9b9a91, inset 1px 1px 1px #fff',
                            outline: '1px solid #000'
                        }}>OK</button>
                </div>
            </div>
        </div>
    );
}
