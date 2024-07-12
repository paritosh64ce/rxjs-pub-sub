/* eslint-disable */
export default {
  displayName: 'rxjs-pub-sub',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['text-summary', 'html'],
  coverageDirectory: '../../coverage/rxjs-pub-sub',
};
