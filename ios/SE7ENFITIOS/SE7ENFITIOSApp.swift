import SwiftUI

@main
struct SE7ENFITIOSApp: App {
    @State private var authVM = AuthViewModel()

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(authVM)
                .preferredColorScheme(.dark)
                .task {
                    await authVM.restoreSession()
                }
        }
    }
}
