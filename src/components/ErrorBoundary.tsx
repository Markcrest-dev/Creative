/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the component tree
 * and displays a fallback UI instead of crashing the whole app
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../services/logger';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to logging service
        logger.error('Error caught by boundary', {
            error: error.toString(),
            componentStack: errorInfo.componentStack,
            stack: error.stack,
        });

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Store error info in state
        this.setState({
            errorInfo,
        });

        // Send to monitoring service in production
        // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    }

    private handleReset = (): void => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
        });
    };

    private handleGoHome = (): void => {
        window.location.href = '/';
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Custom fallback UI provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                    <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
                        {/* Error Icon */}
                        <div className="mb-6 flex justify-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-red-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Error Message */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Oops! Something went wrong
                        </h1>

                        <p className="text-gray-600 mb-6 text-lg">
                            We apologize for the inconvenience. Our team has been notified and we're working on fixing this issue.
                        </p>

                        {/* Error Details (Development Only) */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mb-6 text-left bg-gray-50 rounded-lg p-4">
                                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                                    Error Details (Development Only)
                                </summary>
                                <div className="space-y-2">
                                    <div>
                                        <p className="font-semibold text-sm text-gray-600">Error Message:</p>
                                        <p className="text-sm text-red-600 font-mono">{this.state.error.message}</p>
                                    </div>
                                    {this.state.error.stack && (
                                        <div>
                                            <p className="font-semibold text-sm text-gray-600">Stack Trace:</p>
                                            <pre className="text-xs text-gray-700 overflow-auto max-h-40 bg-white p-2 rounded border">
                                                {this.state.error.stack}
                                            </pre>
                                        </div>
                                    )}
                                    {this.state.errorInfo?.componentStack && (
                                        <div>
                                            <p className="font-semibold text-sm text-gray-600">Component Stack:</p>
                                            <pre className="text-xs text-gray-700 overflow-auto max-h-40 bg-white p-2 rounded border">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </details>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                            >
                                Go to Homepage
                            </button>
                        </div>

                        {/* Contact Support */}
                        <p className="mt-6 text-sm text-gray-500">
                            If this problem persists, please{' '}
                            <a
                                href="/contact"
                                className="text-orange-500 hover:text-orange-600 underline"
                            >
                                contact our support team
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
