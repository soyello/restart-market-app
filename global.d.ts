export {};

declare global {
  namespace kakao {
    namespace maps {
      class LatLng {
        getLat(): number;
        getLng(): number;
      }

      namespace event {
        interface MouseEvent {
          latLng: LatLng;
        }
      }
    }
  }
}
